import { FormControl, Validators } from '@angular/forms';

export class Role {
    id = new FormControl('');
    uuid = new FormControl('');
    name = new FormControl('', Validators.required);
    state = new FormControl(true);
    status = new FormControl('Active', Validators.required);
    createdDate = new FormControl(new Date());
    updatedDate = new FormControl(new Date());
}
