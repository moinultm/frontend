
import { ToastrService } from 'ngx-toastr';


export function success(title: string, content: string, toastr: ToastrService): void {
    toastr.success(content, title);
}

export function error(title: string, content: string, toastr: ToastrService): void {
    toastr.error(content, title);
}

export function warning(title: string, content: string, toastr: ToastrService): void {
    toastr.warning(content, title);
}


export function info(title: string, content: string, toastr: ToastrService): void {
    toastr.info(content, title);
}
