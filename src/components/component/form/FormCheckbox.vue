<template>
    <div class="form-group">
        <div class="form-check">
            <input class="form-check-input"
                   type="checkbox"
                   :value="label"
                   :disabled="isDisabled"
                   :id="inputId"
                   :name="inputId"
                   v-bind="$attrs"
                   @change="changeHandler($event.target)"
            >
            <label class="form-check-label" :for="inputId">
                {{label}}
            </label>
        </div>
        <span class="form-input-error">{{ errorText }}</span>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
export default defineComponent({
    name: "FormCheckbox",
    emits: ['update:modelValue', 'unChecked'],
    props: {
        label: {
            type: String,
            require: true
        },
        id: {
            type: Number,
            require: true,
        },
        inputId: {
            type: String,
            require: true,
        },
        isDisabled: {
          type: Boolean
        },
        isMultiple: Boolean,
    },
    setup(props, {emit}){
        function changeHandler(event:HTMLInputElement) {
            if (props.isMultiple){
                if(event.checked){
                    emit('update:modelValue', event.value)
                } else {
                    emit('unChecked', props.id)
                }
            } else {
                emit('update:modelValue', event.checked)
            }
        }
        return{
            changeHandler
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