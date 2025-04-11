<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class StockPriceUpdated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    // public string $symbol;
    // public float $price;
    public $stocks;
    /**
     * Create a new event instance.
     */
    public function __construct(array $stocks)
    {
        //
        $this->stocks = $stocks;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel
     */
    public function broadcastOn(): Channel
    {
        return new Channel('stocks');
    }

    public function broadcastWith()
    {
        return [
            'stocks' => $this->stocks,
        ];
    }
}
