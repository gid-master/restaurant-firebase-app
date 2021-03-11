<template>
  <div class="additional">
    <div v-for="(additional, index) of additionals" :key="additional.id">
      <div class="control">
        <div class="item">
          <span class="price">{{ formatCurrency(additional.price) }}</span>
          <span class="ingredient">{{ additional.name }}</span>
          <p class="description">
            <small>{{ additional.description }}</small>
          </p>
        </div>

        <ButtonIncrement
          :disabledMin="additional.quantity === 0"
          :disabledMax="
            additional.quantity === additional.limit || disableIncrement
          "
          :quantity="additional.quantity"
          @increment-clicked="onIncrementClicked(additional.id, $event)"
        />
      </div>
      <div class="separator" v-if="index < additionals.length - 1"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from "vue";
  import { formatCurrency } from "@/utils/FormatUtil";
  import { IProductAdditional } from "@/interfaces/IProduct";
  import ButtonIncrement from "@/components/shared/buttons/ButtonIncrement.vue";

  export default defineComponent({
    name: "ProductAdditional",
    props: {
      maxAdditionals: Number,
      additionals: Array as () => IProductAdditional[]
    },
    components: {
      ButtonIncrement
    },
    setup(props, { emit }) {
      const disableIncrement = computed(() => {
        const total: number = props.additionals.reduce(
          (total, { quantity }) => total + quantity,
          0
        );
        return total === props.maxAdditionals;
      });

      const onIncrementClicked = (id: string, increment: number) => {
        emit("increment-clicked", { id, increment });
      };

      return { formatCurrency, disableIncrement, onIncrementClicked };
    }
  });
</script>

<style scoped lang="scss">
  .additional {
    .separator {
      height: 1px;
      width: 100%;
      margin: 15px 0;
      background-color: $divider;
    }

    .control {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .item {
        padding: 0;
        margin-right: 15px;
        display: flex;
        flex-flow: column;

        .price {
          color: $primary-color;
          margin-bottom: 3px;
        }

        .ingredient {
          color: $text-dark;
          margin-bottom: 3px;
        }

        .description {
          color: $text-dark-secondary;
        }
      }
    }
  }
</style>
