<template>
  <div class="macro">
    <div class="item">
      <img src="@/assets/icons/gold/calories.svg" />
      <span>{{ product.calories }} cal</span>
    </div>
    <div class="separator"></div>
    <div class="item">
      <img src="@/assets/icons/gold/weight.svg" />
      <span>{{ product.portionSize }} {{ product.unitType }}</span>
    </div>
    <div class="separator"></div>
    <div class="item">
      <img src="@/assets/icons/gold/room_service.svg" />
      <span>servem {{ product.servingPeople }}</span>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { IProduct } from "@/interfaces/IProduct";

  export default defineComponent({
    name: "ProductMacro",
    props: {
      product: Object as () => IProduct
    }
  });
</script>

<style scoped lang="scss">
  .macro {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // background: $third-color;

    .separator {
      height: 30px;
      width: 1px;
      background-color: $divider;
    }

    .item {
      display: flex;
      align-items: center;

      img {
        width: 26px;
        height: 26px;
        margin-right: 5px;
      }

      span {
        color: $text-dark;
      }
    }
  }
</style>
