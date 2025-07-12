<template>
    <div class="loading-indicator-2">
        <span class="animate ball delay1"></span>
        <span class="animate ball delay2"></span>
        <span class="animate ball delay3"></span>
        <span class="animate ball delay4"></span>
    </div>
</template>

<script setup lang="ts">


</script>
<style scoped>
.loading-indicator-2 { 
    height: 100vh;
    width: 100%;
    display: flex; 
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}
.loading-indicator-2 .animate { 
animation: bounce 850ms ease-in-out infinite forwards;
}
.animate.delay1 { animation-delay: 0ms; }
.animate.delay2 { animation-delay: 100ms; }
.animate.delay3 { animation-delay: 200ms; }
.animate.delay4 { animation-delay: 300ms; }

.ball {
  display:inline-block;
  height: 10px; 
  width: 10px; 
  border-radius: 50%; 
  background: black;
  
}

@keyframes bounce { 
  0% { 
    transform: translateY(0)
  }
  
  50% { 
    transform: translateY(-30px);
  }
  
  
  90% { 
    transform: translateY(1px)
  }
  100% { 
    transform: translateY(0)
  }
}
</style>
