<script lang="ts">
	export let data;
</script>

<div>
	{#each data.users as user}
		<div class="flex flex-col gap-1">
			<span>{user.username}</span>
			<span>{user.email}</span>
		</div>
	{/each}
</div>
