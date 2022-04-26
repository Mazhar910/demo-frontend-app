import { FormControl, Validators } from '@angular/forms';

export class User {
    id = new FormControl('');
    uuid = new FormControl('');
    selectLabel = new FormControl('');
    fullName = new FormControl('', Validators.required);
    
    password = new FormControl(Math.random().toString(36).slice(-8));
    confirmPassword = new FormControl(this.password.value);
    email = new FormControl('', [Validators.required, Validators.email]);
    phone = new FormControl('', [Validators.required,    Validators.maxLength(11),    Validators.minLength(11)]);
    agreed = new FormControl(false, Validators.requiredTrue);
    role = new FormControl(null);
    avatar = new FormControl(null);
    
    state = new FormControl(true);
    status = new FormControl('Active');
    createdDate = new FormControl(new Date());
    updatedDate = new FormControl(new Date());
    locations = new FormControl(null);
}