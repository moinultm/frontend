import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of} from "rxjs";
import {catchError, finalize, map, count} from "rxjs/operators";

export class TablesDataSource implements DataSource<any[]> {

    private tablesSubject = new BehaviorSubject<any[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    constructor(private anyService: any) {   }
    resultsLength = 0;
    loadTables(filter:string, sortDirection:string, pageIndex:number,  pageSize:number,id?:number) {
        this.loadingSubject.next(true);
        this.anyService.findTable(filter,sortDirection, pageIndex,   pageSize,id)
        .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false)),
            )
            .subscribe(
                result =>{
                this.tablesSubject.next(result) ,
                this.resultsLength = result.length;
              }
            );

        }

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        console.log("Connecting data source");
        return this.tablesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.tablesSubject.complete();
        this.loadingSubject.complete();
    }

}

//Get more info from
//https://github.com/academind/angular-material-introduction/tree/03-data-table
//https://www.reddit.com/r/Angular2/comments/9xiovl/angular_material_data_table_paginator_getting/
