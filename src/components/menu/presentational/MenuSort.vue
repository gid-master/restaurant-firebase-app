<template>
  <div class="sort">
    <div class="item">
      <ButtonCircle
        name="Relevant"
        icon="relevant"
        :selected="sortId === 'relevant'"
        @button-clicked="onSortClicked('relevant')"
      />
    </div>

    <div class="item">
      <ButtonCircle
        name="A-Z"
        icon="alpha"
        :selected="sortId === 'alpha'"
        @button-clicked="onSortClicked('alpha')"
      />
    </div>

    <div class="item">
      <ButtonCircle
        name="Price"
        icon="price"
        :selected="sortId === 'price'"
        @button-clicked="onSortClicked('price')"
      />
    </div>

    <div class="item">
      <ButtonCircle
        name="Calorie"
        icon="calories"
        :selected="sortId === 'calories'"
        @button-clicked="onSortClicked('calories')"
      />
    </div>

    <div class="item">
      <ButtonCircle
        name="Category"
        icon="category"
        :selected="sortId === 'category'"
        @button-clicked="onSortClicked('category')"
      />
    </div>

    <div class="item">
      <ButtonCircle
        name="Review"
        icon="review"
        :selected="sortId === 'review'"
        @button-clicked="onSortClicked('review')"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import ButtonCircle from "@/components/shared/buttons/ButtonCircle.vue";

  export default defineComponent({
    name: "MenuSort",
    props: {
      sortId: String
    },
    components: {
      ButtonCircle
    },
    setup(props, { emit }) {
      const onSortClicked = (sortId: string) => {
        emit("sort-clicked", sortId);
      };

      return { onSortClicked };
    }
  });
</script>

<style scoped lang="scss">
  .sort {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;

    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: calc(100% / 3);
      padding: $padding;
    }
  }
</style>
