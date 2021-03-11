<template>
  <div class="bio">
    <h2>{{ user?.name }}</h2>
    <span>{{ user?.email }}</span>

    <ButtonStandard
      name="Logout application"
      :center="true"
      @button-clicked="onLogoutClicked"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { IUser } from "@/interfaces/IUser";
  import ButtonStandard from "@/components/shared/buttons/ButtonStandard.vue";

  export default defineComponent({
    name: "AccountBio",
    props: {
      user: Object as () => IUser
    },
    components: {
      ButtonStandard
    },
    setup(props, { emit }) {
      const onLogoutClicked = () => {
        emit("logout-clicked");
      };

      return {
        onLogoutClicked
      };
    }
  });
</script>

<style scoped lang="scss">
  .bio {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;

    h2 {
      color: $text-dark;
      margin: 5px 0;
    }

    span {
      color: $text-dark-secondary;
      margin-bottom: 20px;
    }
  }
</style>
