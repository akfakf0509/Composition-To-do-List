<script setup>
const workList = ref(["asdf"]);
</script>

<template>
    <ul>
        <WorkCard title="test" />
        <WorkCard title="test" />
        <WorkCard title="test" />
        <WorkCard title="test" />
    </ul>
    <div>Hello World</div>
    {{ workList }}
</template>
