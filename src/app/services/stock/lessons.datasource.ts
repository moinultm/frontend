import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of} from "rxjs";
import {SellsOrder} from "@models/stock/sellsorder.model";
import {SellsOrderService} from "@services/stock/sellsorder.service";
import {catchError, finalize} from "rxjs/operators";



export class TablesDataSource implements DataSource<any[]> {

    private tablesSubject = new BehaviorSubject<any[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    constructor(private coursesService: SellsOrderService) {    }

    loadTables(
                filter:string,
                sortDirection:string,
                pageIndex:number,
                pageSize:number) {
        this.loadingSubject.next(true);
        this.coursesService.findLessons(
            filter,
            sortDirection,
            pageIndex,
            pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(
              lessons => this.tablesSubject.next(lessons)
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
