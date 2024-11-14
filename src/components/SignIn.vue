<template>
    <div class="signin">
        <div v-if="isLogin" class="card login">
            <h2>Login</h2>
            <form @submit.prevent="handleLogin">
                <input type="email" placeholder="Email" v-model="email" required />
                <input type="password" placeholder="Password" v-model="password" required />
                <label class="checkbox">
                    <input type="checkbox" v-model="rememberMe" /> Remember me
                </label>
                <button type="submit" class="btn">Login</button>
            </form>
            <a href="#" @click.prevent="forgotPassword" class="link">Forgot Password?</a>
            <a @click.prevent="toggleMode" class="toggle">Go to Signup</a>
        </div>
        <div v-else class="card signup">
            <h2>Sign Up</h2>
            <form @submit.prevent="handleSignup">
                <input type="email" placeholder="Email" v-model="email" required />
                <input type="password" placeholder="Password" v-model="password" required />
                <input type="text" placeholder="Secret Key" v-model="secretKey" required />
                <label class="checkbox">
                    <input type="checkbox" v-model="agreeToTerms" /> Agree to Terms and Conditions
                </label>
                <button type="submit" class="btn">Sign Up</button>
            </form>
            <a @click.prevent="toggleMode" class="toggle">Go to Login</a>
        </div>
    </div>
</template>

<script>
export default {
    name: "SignIn",
    data() {
        return {
            isLogin: true,
            email: '',
            password: '',
            rememberMe: false,
            secretKey: '',
            agreeToTerms: false,
        };
    },
    methods: {
        toggleMode() {
            this.isLogin = !this.isLogin;
        },
        handleLogin() { },
        handleSignup() { },
        forgotPassword() { },
    },
};
</script>

<style scoped>
.signin {
    color: white;
}

.card {
    background-color: #333;
    padding: 2rem;
    border-radius: 8px;
    max-width: 400px;
    margin: auto;
    transition: all 0.3s ease;
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

.checkbox {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
}

.checkbox input {
    margin-right: 0.5rem;
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

.link {
    display: inline-block;
    margin-top: 1rem;
    color: #b3b3b3;
    font-size: 0.9rem;
    text-decoration: underline;
}

.toggle{
    cursor: pointer;
    display: block;
}
</style>