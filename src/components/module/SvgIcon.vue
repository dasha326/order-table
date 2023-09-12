<template>
    <svg :width="w" :height="h">
        <use :xlink:href="iconPath"/>
    </svg>
</template>

<script>
export default {
    name: 'svg-icon',

    props: {
        name: {
            type: String,
            required: true
        },
        h: {
            type: String,
            default: '15'
        },
        w: {
            type: String,
            default: '15'
        }
    },
    setup(props) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        let iconPath = require(`@/assets/svg-sprite/${props.name}.svg`);
        if (Object.prototype.hasOwnProperty.call(iconPath, 'default')) {
            iconPath = iconPath.default;
        }
        return {iconPath};
    },
};
</script>

<style>
svg {
    fill: currentColor;
    max-height: 24px;
}
</style>
