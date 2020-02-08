<template>
    <v-dialog v-model="visible" persistent max-width="80vh">
        <v-card>
            <v-card-title :class="`headline ${color} ${color==='primary' ? 'white--text' : ''}`">
                {{title}}
            </v-card-title>
            <v-card-text class="mt-2">
                {{text}}
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn :color="color" @click="emitResponse(true)">Da</v-btn>
                <v-btn :color="color" text @click="emitResponse(false)">Ne</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: 'ModalDialog',
        props: {
            visible:{
                type: Boolean,
                required: true,
                default: false
            },
            color:{
                type: String,
                required: false,
                default: 'primary'
            },
            title:{
                type: String,
                required: false,
                default: ''
            },
            text:{
                type: String,
                required: false,
                default: ''
            },

        
        },
        methods:{
            emitResponse(value){
                this.$emit('response', value)
            }
        }
    }
</script>

<style>

</style>