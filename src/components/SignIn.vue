<template>
    <div class="wrapper">
        <Transition name="slide">
            <div v-if="isSignin" class="card">
                <h2>로그인</h2>
                <form @submit.prevent="handleSignin">
                    <input type="email" placeholder="이메일" v-model="email" v-on:change="hideLoginFailed"
                        :disabled="isSubmitting" required />
                    <input type="password" placeholder="비밀번호" v-model="password" :disabled="isSubmitting" required />
                    <Checkbox v-model="rememberMe" :disabled="isSubmitting" text="로그인 정보 기억하기"
                        class="checkbox-wrapper" />
                    <label v-if="showLoginFailed" class="check-label">
                        이메일 혹은 비밀번호가 올바르지 않습니다.
                    </label>
                    <button type="submit" class="btn" :disabled="isSubmitting">
                        <span v-if="isSubmitting" class="spinner" />
                        <span v-else>로그인</span>
                    </button>
                </form>
                <div class="toggle-wrapper">
                    <p class="toggle-text">계정이 없으신가요?</p>
                    <a @click.prevent="toggleMode" class="toggle">회원가입</a>
                </div>
            </div>
            <div v-else class="card">
                <h2>회원가입</h2>
                <form @submit.prevent="handleSignup">
                    <input type="email" placeholder="이메일" v-model="email" @input="debouncedCheckEmail"
                        :disabled="isSubmitting" required />
                    <label v-if="emailExists" class="check-label">
                        이미 사용중인 이메일입니다.
                    </label>
                    <input type="password" placeholder="비밀번호" v-model="password" :disabled="isSubmitting" required />
                    <input type="text" placeholder="TMDB API Key" v-model="apiKey" :disabled="isSubmitting" required />
                    <Checkbox v-model="agreeToTerms" :disabled="isSubmitting" text="이용 약관에 동의합니다."
                        class="checkbox-wrapper" />
                    <label v-if="!agreeToTerms && submitted" class="check-label">
                        이용 약관에 동의해주세요.
                    </label>
                    <label v-if="showSignupFailed" class="check-label">
                        회원가입에 실패하였습니다.
                    </label>
                    <button type="submit" class="btn" :disabled="isSubmitting || emailExists">
                        <span v-if="isSubmitting" class="spinner" />
                        <span v-else>회원가입</span>
                    </button>
                </form>
                <div class="toggle-wrapper">
                    <p class="toggle-text">이미 계정이 있나요?</p>
                    <a @click.prevent="toggleMode" class="toggle">로그인</a>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script>// Todo: spinner, toast 추가 / tailwind 적용 고려 / 자동 로그인 / 세션 검사
import Checkbox from './Checkbox.vue';
import { debounce } from 'lodash-es';

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
            submitted: false,
            isSubmitting: false,
            emailExists: false,
            showLoginFailed: false,
            showSignupFailed: false,
        };
    },
    methods: {
        toggleMode() {
            this.isSignin = !this.isSignin;
        },
        handleSignin() {
            this.isSubmitting = true;
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const user = users.find(u =>
                    u.email === this.email && u.password === this.password
                );

                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                    this.isSubmitting = false;
                    this.$toast.open({
                        message: '로그인 성공!',
                        type: 'success',
                        position: 'top',
                    });
                    this.$router.push('/home');
                } else {
                    this.isSubmitting = false;
                    this.showLoginFailed = true;
                }
            }, 2000);
        },
        checkEmailAvailability() {
            if (!this.email) {
                this.emailExists = false;
                return;
            }
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const existingUser = users.find(u => u.email === this.email);

            this.emailExists = existingUser ? true : false;
        },
        debouncedCheckEmail: null,
        handleSignup() {
            this.submitted = true;
            if (!this.agreeToTerms || this.emailExists) {
                return;
            }
            this.isSubmitting = true;
            try {
                setTimeout(() => { // for dev
                    const users = JSON.parse(localStorage.getItem('users') || '[]');
                    const newUser = {
                        email: this.email,
                        password: this.password,
                        apiKey: this.apiKey,
                    };

                    users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(users));

                    this.isSubmitting = false;
                    this.$toast.open({
                        message: '회원가입 성공!',
                        type: 'success',
                        position: 'top',
                    });
                    this.$router.push('/home');
                }, 2000);
            }
            catch (error) {
                console.error(error);
                this.showSignupFailed = true;
            }
        },
        hideLoginFailed() {
            this.showLoginFailed = false;
        },
        hideSignupFailed() {
            this.showSignupFailed = false;
        },
    },
    created() {
        this.debouncedCheckEmail = debounce(this.checkEmailAvailability, 500);
    }
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
}

input[type="email"],
input[type="password"],
input[type="text"] {
    width: 100%;
    padding: 0.8rem;
    margin-top: 1rem;
    background-color: #222;
    border: 1px solid #444;
    color: white;
    border-radius: 4px;
}

.checkbox-wrapper {
    margin-top: 1rem;
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
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn:disabled,
input:disabled {
    cursor: default;
    background-color: #444;
    color: #b3b3b3;
}

.btn:hover {
    background-color: #f40612;
}

.btn:disabled:hover {
    background-color: #444;
    transform: none;
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

.check-label {
    color: #e50914;
    font-size: 0.9rem;
}

.spinner {
    width: 1.4rem;
    height: 1.4rem;
    border: 4px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
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