<template>
    <div>
        <label class="checkbox-label">
            <input type="checkbox" class="checkbox" :checked="modelValue" @change="updateValue">
            <span class="checkmark"></span>
            <span class="checkbox-text">{{ text }}</span>
        </label>
    </div>
</template>

<script> // Todo: disabled 속성 추가
export default {
    name: 'Checkbox',
    props: {
        text: {
            type: String,
            required: true
        },
        modelValue: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue'],
    methods: {
        updateValue(event) {
            this.$emit('update:modelValue', event.target.checked)
        }
    }
}
</script>

<style scoped>
.checkbox {
    display: none;
}

.checkbox-label {
    position: relative;
    padding-left: 35px;
    display: flex;
    align-items: center;
}

.checkmark {
    position: absolute;
    left: 0;
    height: 24px;
    width: 24px;
    background-color: transparent;
    border: 2px solid #404040;
    border-radius: 4px;
    transition: all 0.3s;
}

.checkbox:checked+.checkmark {
    background-color: #e50914;
    border-color: #e50914;
}

.checkmark:after {
    content: "";
    position: absolute;
    display: none;
    left: 7px;
    top: 3px;
    width: 6px;
    height: 11px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

.checkbox:checked+.checkmark:after {
    display: block;
}
</style>