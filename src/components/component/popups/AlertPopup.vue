<template>
    <div class="modal modal-sm" tabindex="-1" ref="popupRef">
        <div class="modal-dialog">
            <div class="modal-content" :class="alertType ? '--' + alertType : ''">
                <div class="modal-header">
                    <h6 class="modal-title">{{ alertTitle }}</h6>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    {{alertText}}
                </div>
                <div class="modal-footer" v-if="$slots.footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted, computed, PropType} from "vue";
import {Modal} from "bootstrap";
import {RequiredType} from "@/tools/types";
export default defineComponent({
    name: "AlertPopup",
    props: {
        alertType: {
            type: Object as PropType<RequiredType>
        }
    },
    setup(props) {
        const popupRef = ref<HTMLElement | null>(null);
        let popup: Modal;

        function openPopup() {
            popup.show();
            setTimeout(()=> {
                closePopup()
            }, 5000)
        }
        function closePopup() {
            popup.hide();
        }

        onMounted(() => {
            if (popupRef.value) {
                popup = new Modal(popupRef.value);
            }
        })

        const alertTitle = computed(() => {
            if(props.alertType === 'success'){
                return 'Заявка успешно отправлена'
            } else {
                return 'Какая то проблема'
            }
        })
        const alertText = computed(() => {
            if(props.alertType === 'success'){
                return 'Ожидайте звонка подтвреждения'
            }  else {
                return 'Попробуйте отпраивть еще раз или позвоните нам'
            }
        })

        return {
            alertTitle, alertText,
            popupRef,
            openPopup, closePopup}

    },
})
</script>

<style scoped lang="scss">
    .modal-content{
        &.--success{
            background-color: lighten($success, 40%);
        }
        &.--error{
            background-color: lighten($danger, 40%);
        }
    }
</style>