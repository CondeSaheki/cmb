<script lang="ts">
    export let video: string = "";
    export const width: number = 960;
    export const height: number = 540;
</script>

<iframe width={width} height={height} src="https://www.youtube.com/embed/{video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>