<template>
<main class="register">
    <section class="register__layout">
        <registerHeader :headerData="headerData" />
        <div class="register-content">
            <formBody :headerData="headerData" :installationDataProp="installationData" />
            <registerNews v-if="!installationData.installation" />
        </div>
        <div class="installation" v-if="installationData.installation">
            <div class="installation__bar-box">
                <div class="installation-status-bar" style="width:0%" :style="{'width':barWidth}"></div>
            </div>
            <p class="installation__package">Installation package: <span class="package-name">{{installationData.packageName}}</span></p>
        </div>
    </section>
</main>
</template>

<script>
import registerHeader from '@/components/register/register-header';
import registerNews from '@/components/register/register-news';
import formBody from '@/components/register/register-form/form-body';
export default {
    name: 'Login',
    components: {
        formBody,
        registerHeader,
        registerNews
    },
    data() {
        return {
            headerData: {
                title: "Let's configure the system account",
            },
            installationData: {
                installation: false,
                step: 0,
                packageName: 'asd aksjdklajskl jkdlaskl'
            }
        }
    },
    computed: {
        barWidth() {
            return this.installationData.step / 6 * 100 + "%"
        }
    }
}
</script>

<style scoped>
.register {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
    color: #FFF;
    background-color: var(--register-main-color);
}

.register__layout {
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 1400px;
    padding: 5rem;
}

.register-content {
    position: relative;
    display: grid;
    grid-template-columns: 330px 1fr;
    grid-gap: 6rem;
    width: 100%;
}

.installation {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 330px;
    height: auto;
    margin: 0 auto;
    padding: 2rem;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.4);
}

.installation__bar-box {
    width: 100%;
    height: 0.5rem;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 100px;
}

.installation-status-bar {
    width: 0;
    height: 100%;
    background-color: #FFF;
    border-radius: 100px;
    transition: 0.3s ease all;
}

.installation__package {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    height: 2rem;
    text-align: center;
}

.package-name {
    color: var(--register-second-color);
}

@media (max-width:1050px) {
    .register{
        display: block;
        height: auto;
    }
    .register-content{
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .register__layout{
        padding: 3rem;
    }
}

@media (max-width:600px) {
    .register__layout{
        padding: 3rem 1rem;
    }
}
</style>
