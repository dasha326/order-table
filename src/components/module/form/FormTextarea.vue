<template>
    <label class="form-group">
        <span class="form-label" :class="{'visually-hidden': labelHidden }" >{{label}}</span>
        <span class="form-input-wrapper">
            <textarea
                ref="currentInput"
                class="form-input"
                :class="inputModClass"
                :placeholder="placeholder"
                v-bind="$attrs"
                v-model="inputValue"
                :required="isRequired"
                @keyup="validRequiredInput()"
                @blur="validateInput()" 
            ></textarea>
            <span class="form-input-prefix" v-if="$slots.prefix">
                <slot name="prefix"></slot>
            </span>
            <span class="form-input-postfix"  v-if="$slots.postfix">
                <slot name="postfix"></slot>
            </span>
        </span>
        <span class="form-input-error">{{ errorText }}</span>
    </label>
</template>

<script lang="ts">
import {defineComponent, PropType, ref} from "vue";
import useFormValidation from '@/tools/form-validate'
import {InputValidLabelsType} from "@/tools/types";
export default defineComponent({
    name: "FormTextarea",
    props: {
        label: {
            type: String,
            require: true
        },
        type: {
            type: String,
            require: true,
            default: 'text'
        },
        placeholder: String,
        labelHidden: Boolean,
        isRequired: Boolean,
        valid: {
            type: Object as PropType<InputValidLabelsType>,
            default: null
        }
    },
    expose: ['validateInput'],
    setup(props, {slots}){
        const inputValue = ref('');
        const errorText = ref('');
        const currentInput = ref<HTMLInputElement | null>(null);

        const validRequiredInput = () => {
            if (props.isRequired) validateInput();
        }

        const validateInput = () => {
            return new Promise((resolve) => {
                errorText.value = useFormValidation(inputValue.value, props.isRequired, props.valid);
                if(errorText.value !== ''){
                    currentInput.value?.setCustomValidity("Invalid");
                    resolve(false)
                } else {
                    currentInput.value?.setCustomValidity('');
                    resolve(true);
                }
            })
        };
        return{
            inputModClass: {
                '--prefix': slots.prefix,
                '--postfix': slots.postfix
            },
            inputValue, errorText, currentInput,
            validateInput, validRequiredInput
        }
    }
})
</script>

<style scoped lang="scss">
    .form{
        &-group{
            display: block;
            margin-top: 15px;
        }
        &-label{
            font-weight: $font-weight-bold;
        }
        &-input{
            @extend .form-control;
            order: 2;
            &:invalid{
                border-color: $danger;
                ~ *{
                    color: $danger;
                }
            }
            &:required{
                background-color: lightblue !important;
            }
            &.--prefix{
                padding-left: $input-padding-x + 1.5;
            }
            &.--postfix{
                padding-right: $input-padding-x + 1.5;
            }
            &-wrapper{
                position: relative;
                display: flex;
                &:not(:first-child){
                    margin-top: 10px;
                }
            }
            &-prefix,
            &-postfix{
                display: flex;
                align-items: center;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                max-width: 20px;

            }
            &-prefix{
                order: 1;
                left: $input-padding-x;
            }
            &-postfix{
                order: 3;
                right:  $input-padding-x;
            }
            &-error{
                color: $danger;
                font-weight: $font-weight-semibold;
                margin-top: 5px;
            }
        }
    }
</style>