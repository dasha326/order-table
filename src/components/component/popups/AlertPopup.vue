<template>
    <div class="modal modal-sm" tabindex="-1" ref="popupRef">
        <div class="modal-dialog">
            <div class="modal-content" :class="alertData?.alertType ? '--' + alertData?.alertType : ''">
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
import {IRequiredAlertError, IRequiredAlertSuccess} from "@/tools/types";
export default defineComponent({
    name: "AlertPopup",
    props: {
        alertData :{
            type: Object as PropType<IRequiredAlertSuccess|IRequiredAlertError>
        }
    },
    expose: ['openPopup', 'closePopup'],
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

        const alertTitle = computed(() => props.alertData?.title)
        const alertText = computed(() => props.alertData?.text)

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