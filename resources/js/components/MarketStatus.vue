<template >
    <v-container v-if="holiday" >
        <v-alert v-if="marketStatus == 'closed'" color="#C51162" icon="mdi-cancel" theme="dark" density="compact" border>
            Markets are closed in observance of <b>{{ holiday }}</b>
        </v-alert>
        <v-alert v-if="marketStatus == 'early-close'" color="#C51162" icon="mdi-cancel" theme="dark" density="compact" border>
            Markets are closing early <b> [{{ closeTime }} UTC]</b> in observance of <b>{{ holiday }}</b>
        </v-alert>
    </v-container>


    <v-container v-if="afterHours || marketsAreOpen">
        <v-row justify="end">
            <div>
                <v-btn
                class="after-hours-btn" variant="outlined" color="green" density="comfortable" rounded="lg"
                :ripple="false" style="pointer-events: none;"
                >
                <div class="content-wrapper" >
                    <span v-if="afterHours" class="after-hours-text">After Hours</span>
                    <span v-if="marketsAreOpen && !afterHours" class="after-hours-text">Markets Are Open</span>
                    <span class="dot" />
                </div>
                </v-btn>
            </div>

        </v-row>
    </v-container>
    <v-container v-else>
        <v-row justify="end">
            <div>
                <v-btn
                class="closed-hours-btn" variant="outlined" color="red" density="comfortable" rounded="lg"
                :ripple="false" style="pointer-events: none;"
                >
                <div class="content-wrapper" >
                    <span class="after-hours-text">Markets Are Closed</span>
                    <span class="closed-dot" />
                </div>
                </v-btn>
            </div>

        </v-row>
    </v-container>



</template>

<style scoped>
.after-hours-btn {
  border-color: #4caf50;
  font-weight: bold;
  text-transform: none;
  padding: 6px 12px;
}

.closed-hours-btn {
  border-color: red;
  font-weight: bold;
  text-transform: none;
  padding: 6px 12px;
}

.content-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.after-hours-text {
  font-size: 14px;
}

.dot {
  width: 10px;
  height: 10px;
  background-color: #4caf50;
  border-radius: 50%;
  animation: pulse 1.5s infinite ease-in-out;
}

.closed-dot {
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.3);
  }
}
</style>


<script setup>
import { ref, onMounted } from 'vue';

const holiday = ref('');
const date = ref('');
const marketStatus = ref('');
const closeTime = ref('')
const afterHours = ref(false)
const marketsAreOpen = ref(false)

onMounted(async () => {
        const response = await axios.get(`/isHoliday`);
            if(response){
                holiday.value = response.data.name;
                marketStatus.value = response.data.status;
                if(marketStatus.value == 'early-close'){
                    var date = new Date(response.data.close);
                    closeTime.value = date.toTimeString().split(' ')[0];
                }
            } else {
                holiday.value = false;
            }

        const apiMarketStatus = await axios.get('/market-status');
        if(apiMarketStatus){
            afterHours.value = apiMarketStatus.data.afterHours;
            marketsAreOpen.value = apiMarketStatus.data.market === 'open';
        }
    });



</script>
