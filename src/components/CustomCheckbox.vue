<template>
  <div :class="cssClass" :style="cssProps">
    <input
      :id="inputId"
      type="checkbox"
      :checked="checked"
      @change="emit('change', !checked)"
    />
    <label :for="inputId"
      ><span class="frame"><span class="mark"></span></span><slot
    /></label>
  </div>
</template>

<script setup>
import { computed, useId } from "vue";

const props = defineProps({
  checked: Boolean,
  color: String,
  type: {
    type: String,
    default: "checkbox",
    validator: (value) => ["checkbox", "marker", "radio"].includes(value),
  },
});

const emit = defineEmits(["change"]);

const inputId = useId();

const cssProps = computed(() => ({
  "--props-color": props.color,
}));

const cssClass = computed(() =>
  ["custom-checkbox", props.type, props.checked ? "checked" : ""].join(" ")
);
</script>

<style scoped>
input {
  display: none;
}

label {
  display: inline-block;
  position: relative;
  padding-left: 20px;
  line-height: 16px;
  font-size: 14px;
  margin-top: 5px;
}

.frame {
  display: inline-block;
  width: 12px;
  height: 12px;
  position: absolute;
  left: 0;
  overflow: hidden;
  padding: 1px;
}

.mark {
  display: block;
  width: 100%;
  height: 100%;
  border: none;
  transition: opacity 0.15s ease-out;
  opacity: 0;
}

.checkbox .frame {
  border: 1px solid var(--props-color);
  border-radius: 3px;
}

.checkbox.checked .frame {
  border: 1px solid var(--primary-text-color);
}

.checkbox .mark {
  background-color: var(--props-color);
  border-radius: 2px;
}

.checkbox.checked .mark {
  opacity: 1;
}

.marker .frame {
  border: 1px solid var(--props-color);
  background-color: var(--props-color);
  border-radius: 50%;
}

.radio .frame {
  border: 1px solid var(--props-color);
  border-radius: 50%;
}

.radio.checked .frame {
  border: 1px solid var(--primary-text-color);
}

.radio .mark {
  background-color: var(--props-color);
  border-radius: 50%;
}

.radio.checked .mark {
  opacity: 1;
}
</style>
