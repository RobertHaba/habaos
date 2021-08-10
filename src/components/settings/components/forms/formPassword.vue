<template>
    <div class="settings-form-wrapper settings-form-wrapper--column">
        <div class="settings-form-column">
                <label class="settings-form-label">{{formProps.label1}}</label>
                <input type="text" class="settings-form-input" placeholder="Old password">
        </div>
        <div class="settings-form-column">
                <label class="settings-form-label">{{formProps.label2}}</label>
                <input type="text" class="settings-form-input" placeholder="New password">
        </div>
    </div>
</template>
<script>
export default {
    props:{
        formProps:Object,
    }
}
</script>