<template>
    <div class="modal" tabindex="-1" ref="popupRef">
        <div class="modal-dialog" :class="bigModal?'modal-fullscreen':''">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ title }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <slot name="body"></slot>
                </div>
                <div class="modal-footer" v-if="$slots.footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted } from "vue";
import {Modal} from "bootstrap";
export default defineComponent({
    name: "PopUp",

    props: {
        title: String,
        bigModal: Boolean
    },
    setup() {
        const popupRef = ref<HTMLElement | null>(null);
        let popup: Modal;

        function openPopup() {
            popup.show();
        }
        function closePopup() {
            popup.hide();
        }

        onMounted(() => {
            if (popupRef.value) {
                popup = new Modal(popupRef.value);
            }
        })
        return {popupRef, openPopup, closePopup}

    },
})
</script>

<style scoped>

</style>