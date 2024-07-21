<script lang="ts">
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  let greeting: string;
  if (currentHour < 12) {
    greeting = "Buenos días";
  } else if (currentHour < 18) {
    greeting = "Buenas tardes";
  } else {
    greeting = "Buenas noches";
  }
</script>
<h2 class="text-2xl font-semibold">{greeting}</h2>