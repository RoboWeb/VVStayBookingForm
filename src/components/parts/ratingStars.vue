<template>
    <div class="stars-rating">
        <icon-star v-for="n in 5" fill="var(--tertiary-bg-color)" :filled="filledStar(n - 1)" ></icon-star>
    </div>
</template>

<script>
import { computed, ref } from 'vue';
export default {
    name: 'ratingStars',
    props: {
        rating: {
            type: String,
            default: "5",
            validator: (value) => {
                const parsed = parseFloat(value);
                return parsed >= 0 && parsed <= 5;
            }
        }
    },
    setup(props) {
        const parsedRating = computed(() => parseFloat(props.rating));

        const emptyStar = (n) => parsedRating.value <= n;
        const halfStar = (n) => Math.floor(parsedRating.value) === n && parsedRating.value > n;

        const filledStar = n => emptyStar(n) ? 'empty' : (halfStar(n) ? 'half' : 'full');

        return {
            filledStar
        }
    }
}
</script>

<style lang="scss" scoped>
.stars-rating  {
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-right: 0.5rem;
}
</style>