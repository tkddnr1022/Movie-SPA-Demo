<template>
  <div class="multi-div-slider">
    <div class="slider-container">
      <div class="div-wrapper" :style="{ transform: `translateX(-${currentOffset}%)` }">
        <div v-for="(item, index) in items" :key="index" class="div-item">
          <slot :item="item" :index="index">
            <div class="default-slot">
              {{ item }}
            </div>
          </slot>
        </div>
      </div>

      <button class="slider-btn prev-btn" @click="prevItems" aria-label="Previous Items">
        &#10094;
      </button>

      <button class="slider-btn next-btn" @click="nextItems" aria-label="Next Items">
        &#10095;
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  type PropType,
  ref,
} from 'vue'

export default defineComponent({
  name: 'Slider',
  props: {
    items: {
      type: Array as PropType<any[]>,
      required: true,
      validator: (value: any[]) => value.length > 0
    },
    itemsPerSlide: {
      type: Number,
      default: 5
    }
  },
  setup(props) {
    const currentGroupIndex = ref<number>(0)
    const currentOffset = ref<number>(0)

    const nextItems = () => {
      const { items, itemsPerSlide } = props;
      const totalGroups = Math.ceil(items.length / itemsPerSlide);

      if (currentGroupIndex.value < totalGroups - 1) {
        currentGroupIndex.value++;

        const remainingItems = items.length - (currentGroupIndex.value * itemsPerSlide);
        const itemsInCurrentGroup = Math.min(remainingItems, itemsPerSlide);

        currentOffset.value += (100 / itemsPerSlide) * itemsInCurrentGroup;
      }
    };

    const prevItems = () => {
      const { items, itemsPerSlide } = props;
      const totalGroups = Math.ceil(items.length / itemsPerSlide);
      const isLastGroup = currentGroupIndex.value === totalGroups - 1;

      if (currentGroupIndex.value > 0) {
        currentGroupIndex.value--;

        if (isLastGroup) {
          const lastGroupSize = items.length % itemsPerSlide || itemsPerSlide;
          const offsetChange = (100 / itemsPerSlide) * lastGroupSize;
          currentOffset.value -= offsetChange;
        } else {
          currentOffset.value -= 100;
        }
      }
    };

    return {
      currentGroupIndex,
      currentOffset,
      nextItems,
      prevItems,
    }
  }
})
</script>

<style scoped>
.multi-div-slider {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}

.slider-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.div-wrapper {
  display: flex;
  transition: transform 0.5s ease;
}

.div-item {
  flex: 0 0 20%;
  /* 5 items per slide */
  box-sizing: border-box;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.div-item:hover {
  transform: scale(1.08);
}

.default-slot {
  background-color: #f0f0f0;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
}

.slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: #bdbdbd;
  border: none;
  padding: 18px 8px;
  cursor: pointer;
  font-size: 24px;
  z-index: 10;
  border-radius: 8px;
}

.slider-btn:hover {
  background-color: rgba(0, 0, 0, 0.6);
  color: #dbdbdb;
}

.prev-btn {
  left: 1rem;
}

.next-btn {
  right: 1rem;
}
</style>