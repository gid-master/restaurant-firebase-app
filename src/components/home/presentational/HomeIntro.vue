<template>
  <div class="intro">
    <img src="@/assets/logo.png" />
    <h1 v-if="user">Hey, {{ user.name }}</h1>
    <h1 v-if="!user">Welcome</h1>
    <span>What do you feel like today ?</span>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { IUser } from "@/interfaces/IUser";

  export default defineComponent({
    name: "HomeIntro",
    props: {
      user: Object as () => IUser
    }
  });
</script>

<style scoped lang="scss">
  .intro {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;

    img {
      width: 118px;
      height: auto;
      margin-bottom: 10px;
    }

    h1 {
      color: $text-dark;
    }

    span {
      color: $text-dark-secondary;
    }
  }
</style>
