<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\Service;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BookingTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    private User $customer;
    private Service $service;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->customer = User::factory()->create(['role' => 'customer']);
        $this->service = Service::factory()->create([
            'name' => 'Plumbing',
            'price' => 50.00,
            'status' => true,
        ]);
    }

    public function test_customer_can_create_booking(): void
    {
        $bookingData = [
            'service_id' => $this->service->id,
            'booking_date' => now()->addDays(7)->format('Y-m-d'),
        ];

        $token = $this->customer->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/bookings', $bookingData);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'message',
                'booking' => [
                    'id',
                    'user_id',
                    'service_id',
                    'booking_date',
                    'status',
                    'service' => [
                        'id',
                        'name',
                        'description',
                        'price',
                        'status',
                    ],
                ],
            ]);

        $this->assertDatabaseHas('bookings', [
            'user_id' => $this->customer->id,
            'service_id' => $this->service->id,
            'status' => 'pending',
        ]);
    }

    public function test_customer_can_view_their_bookings(): void
    {
        $booking = Booking::factory()->create([
            'user_id' => $this->customer->id,
            'service_id' => $this->service->id,
            'booking_date' => now()->addDays(7)->format('Y-m-d'),
            'status' => 'pending',
        ]);

        $token = $this->customer->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/bookings');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'bookings' => [
                    '*' => [
                        'id',
                        'user_id',
                        'service_id',
                        'booking_date',
                        'status',
                        'service' => [
                            'id',
                            'name',
                            'description',
                            'price',
                            'status',
                        ],
                    ],
                ],
            ]);
    }

    public function test_customer_can_update_booking(): void
    {
        $booking = Booking::factory()->create([
            'user_id' => $this->customer->id,
            'service_id' => $this->service->id,
            'booking_date' => now()->addDays(7)->format('Y-m-d'),
            'status' => 'pending',
        ]);

        $updateData = [
            'booking_date' => now()->addDays(14)->format('Y-m-d'),
            'status' => 'confirmed',
        ];

        $token = $this->customer->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->putJson("/api/bookings/{$booking->id}", $updateData);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'message',
                'booking' => [
                    'id',
                    'user_id',
                    'service_id',
                    'booking_date',
                    'status',
                ],
            ]);

        $this->assertDatabaseHas('bookings', [
            'id' => $booking->id,
            'status' => 'confirmed',
        ]);
    }

    public function test_customer_can_cancel_booking(): void
    {
        $booking = Booking::factory()->create([
            'user_id' => $this->customer->id,
            'service_id' => $this->service->id,
        ]);

        $token = $this->customer->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->deleteJson("/api/bookings/{$booking->id}");

        $response->assertStatus(200)
            ->assertJson(['message' => 'Booking cancelled successfully']);

        $this->assertDatabaseMissing('bookings', ['id' => $booking->id]);
    }

    public function test_customer_cannot_book_inactive_service(): void
    {
        $inactiveService = Service::factory()->create([
            'status' => false,
        ]);

        $bookingData = [
            'service_id' => $inactiveService->id,
            'booking_date' => now()->addDays(7)->format('Y-m-d'),
        ];

        $token = $this->customer->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/bookings', $bookingData);

        $response->assertStatus(404);
    }

    public function test_customer_cannot_book_past_date(): void
    {
        $bookingData = [
            'service_id' => $this->service->id,
            'booking_date' => '2024-01-01',
        ];

        $token = $this->customer->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/bookings', $bookingData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['booking_date']);
    }

    public function test_booking_validation(): void
    {
        $token = $this->customer->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/bookings', [
            'service_id' => 999,
            'booking_date' => 'invalid-date',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['service_id', 'booking_date']);
    }
}
