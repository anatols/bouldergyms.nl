<template>
  <div :class="cssClass" :style="cssProps">
    <input
      :id="uniqueId"
      type="checkbox"
      :checked="checked"
      v-on:change="$emit('change', !checked)"
    />
    <label :for="uniqueId"
      ><span class="frame"><div class="mark"/></span><slot
    /></label>
  </div>
</template>

<script>
import uniqueId from "@/utils/uniqueId";

export default {
  name: "CustomCheckbox",
  props: {
    checked: Boolean,
    color: String,
    type: {
      type: String,
      default: "checkbox",
      validator: function(value) {
        return ["checkbox", "marker", "radio"].includes(value);
      },
    },
  },
  mixins: [uniqueId.mixin],
  computed: {
    cssProps() {
      return {
        "--props-color": this.color,
      };
    },
    cssClass() {
      return ["custom-checkbox", this.type, this.checked ? "checked" : ""].join(
        " "
      );
    },
    frameClass() {
      return "checkbox" + (this.disabled ? " disabled" : "");
    },
    frameStyle() {
      return this.checked ? {} : { borderColor: this.color };
    },
    markClass() {
      return (
        "checkmark" +
        (this.disabled ? " disabled" : "") +
        (this.checked ? " checked" : "")
      );
    },
    markStyle() {
      return this.disabled ? {} : { backgroundColor: this.color };
    },
  },
};
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
