//import {reactive} from "vue";
import {InputValidLabelsType} from '@/tools/types'
/*type ErrorType = {

}*/

function isEmail(fieldValue:string):boolean {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(fieldValue);
}
function isPhone(fieldValue:string):boolean {
    const re = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;
    return !re.test(fieldValue);
}

export default function useFormValidation(value: string, isRequired: boolean, type: InputValidLabelsType): string{
    let errorText = '';
        if (isRequired && value === ''){
            errorText = "Это обязательное поле";
        } else {
            if((value !== '') && (type === 'email') && isEmail(value)){
                errorText = "Необходимо ввести правильную почту";
            }
            if((value !== '') && (type === 'tel') && isPhone(value)){
                errorText = "Необходимо ввести корректный номер телефона";
            }
        }

    return errorText;
}