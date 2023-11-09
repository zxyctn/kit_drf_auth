<script lang="ts">
	export let data;
</script>

{#if !data.user.isAuthenticated}
	<dir><a class="btn variant-filled-primary" href="/login">Login</a></dir>
{:else}
	<dir class="grid gap-5 place-items-center"
		><h1>Welcome {data.user.username}!</h1>
    <a class="btn variant-filled-secondary" href="/users">See users</a>
		<form method="POST">
			<button type="submit" class="btn variant-filled-primary">Logout</button>
		</form></dir
	>
{/if}
