<template>
  <div class="search">
    <div class="wrapper">
      <input
        :value="searchTerm"
        @input="onSearchChanged($event.target.value)"
        type="text"
        class="input"
        placeholder="search for a product..."
      />
      <img src="@/assets/icons/dark/search.svg" v-if="!searchTerm" />
      <img
        src="@/assets/icons/dark/clear.svg"
        v-if="searchTerm"
        @click="onSearchChanged(null)"
      />
    </div>
    <ButtonCircle
      :icon="sortId"
      :small="true"
      @button-clicked="onSortClicked"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import ButtonCircle from "@/components/shared/buttons/ButtonCircle.vue";

  export default defineComponent({
    name: "MenuSearch",
    props: {
      searchTerm: String,
      sortId: String
    },
    components: {
      ButtonCircle
    },
    setup(props, { emit }) {
      const onSearchChanged = (search: string) => {
        emit("search-changed", search);
      };

      const onSortClicked = () => {
        emit("open-sort-clicked");
      };

      return { onSearchChanged, onSortClicked };
    }
  });
</script>

<style scoped lang="scss">
  .search {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .wrapper {
      position: relative;
      // width: 280px;
      width: 87%;
      height: 38px;

      img {
        position: absolute;
        right: 10px;
        top: 6px;
        height: 26px;
        width: 26px;
      }

      .input {
        font-size: 16px;
        border: 1px solid $divider;
        border-radius: 20px;
        width: 100%;
        height: 100%;
        background-color: $inputs;
        color: $text-dark-secondary;
        padding: 10px 35px 10px 20px;
      }
    }
  }
</style>
