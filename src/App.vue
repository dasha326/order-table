<template>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <label>
        <input type="text" v-model="message">
        <button @click="sendMessage()">Отправить</button>
    </label>
</template>

<script>
    import HelloWorld from './components/HelloWorld.vue'
    import PieSocket from 'piesocket-js';

    export default {
        name: 'App',
        components: {
            HelloWorld
        },
        data() {
            return {
                channelPieSocket: null,
                message: ''
            }
        },
        methods: {
            sendMessage() {
                return this.channelPieSocket.publish("new_message", {
                    message: this.message
                })
            }
        },
        mounted() {
            const pieSocket = new PieSocket({
                clusterId: "demo",
                apiKey: "BidybaY8rstaLmPA54AHPhOkmKFFExpuOE9ol6qa",
                notifySelf: true
            });

            pieSocket.subscribe("Channel-order-table").then((channel) => {
                console.log("Channel is ready");
                this.channelPieSocket = channel;
            });
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
