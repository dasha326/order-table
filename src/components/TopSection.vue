<template>
    <section class="top-section mt-3 mb-3">
        <div class="container">
            <h1>Резервирование стола</h1>
            <div class="map text-bg-light h1" hidden>Карта зала</div>
        </div>
    </section>
</template>

<script>
export default {
    name: "TopSection"
}
</script>

<style scoped lang="scss">
.map{
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>