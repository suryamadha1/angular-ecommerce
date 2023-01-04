import { FormControl, ValidationErrors } from "@angular/forms";

export class Luv2ShopValidators {
    static notOnlyWhitespace(control: FormControl): ValidationErrors | null {
        // check if string only contains whitespace
        if((control.value != null) && (control.value.trim().length === 0)){
            // invalid, then return error object
            return {'notOnlyWhitespace': true}
        }
        else
            return null
    }
}
