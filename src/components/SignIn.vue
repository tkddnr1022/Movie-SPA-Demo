<template>
    <div class="wrapper">
        <Transition name="slide">
            <div v-if="isSignin" class="card">
                <h2>로그인</h2>
                <form @submit.prevent="handleSignin">
                    <input type="email" placeholder="이메일" v-model="email" required />
                    <input type="password" placeholder="비밀번호" v-model="password" required />
                    <Checkbox v-model="rememberMe" text="로그인 정보 기억하기" />
                    <button type="submit" class="btn">로그인</button>
                </form>
                <div class="toggle-wrapper">
                    <p class="toggle-text">계정이 없으신가요?</p>
                    <a @click.prevent="toggleMode" class="toggle">회원가입</a>
                </div>
            </div>
            <div v-else class="card">
                <h2>회원가입</h2>
                <form @submit.prevent="handleSignup">
                    <input type="email" placeholder="이메일" v-model="email" required />
                    <input type="password" placeholder="비밀번호" v-model="password" required />
                    <input type="text" placeholder="TMDB API Key" v-model="apiKey" required />
                    <Checkbox v-model="agreeToTerms" text="이용 약관에 동의합니다." />
                    <button type="submit" class="btn">회원가입</button>
                </form>
                <div class="toggle-wrapper">
                    <p class="toggle-text">이미 계정이 있나요?</p>
                    <a @click.prevent="toggleMode" class="toggle">로그인</a>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script>
import Checkbox from './Checkbox.vue';

export default {
    name: "SignIn",
    components: {
        Checkbox,
    },
    data() {
        return {
            isSignin: true,
            email: '',
            password: '',
            rememberMe: false,
            apiKey: '',
            agreeToTerms: false,
        };
    },
    methods: {
        toggleMode() {
            this.isSignin = !this.isSignin;
        },
        handleSignin() { },
        handleSignup() { },
        forgotPassword() { },
    },
};
</script>

<style scoped>
.wrapper {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card {
    position: absolute;
    background-color: #333;
    padding: 2rem;
    border-radius: 8px;
    max-width: 400px;
    margin: auto;
}

h2 {
    color: #e50914;
    margin-bottom: 1rem;
}

input[type="email"],
input[type="password"],
input[type="text"] {
    width: 100%;
    padding: 0.8rem;
    margin-bottom: 1rem;
    background-color: #222;
    border: 1px solid #444;
    color: white;
    border-radius: 4px;
}

.btn {
    width: 100%;
    padding: 0.8rem;
    background-color: #e50914;
    border: none;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    border-radius: 4px;
    transition: background 0.2s;
}

.btn:hover {
    background-color: #f40612;
}

.toggle-wrapper {
    margin-top: 1rem;
}

.toggle-text {
    display: inline-block;
    color: #b3b3b3;
}

.toggle {
    margin-left: 0.2rem;
    display: inline-block;
    cursor: pointer;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.5s ease;
}

.slide-enter-from {
    transform: translateY(100%);
}

.slide-leave-to {
    transform: translateY(-100%);
}
</style>