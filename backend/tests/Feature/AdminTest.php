<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\Service;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AdminTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    private User $admin;
    private User $customer;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->admin = User::factory()->create(['role' => 'admin']);
        $this->customer = User::factory()->create(['role' => 'customer']);
    }

    public function test_admin_can_view_all_bookings(): void
    {
        $service = Service::factory()->create();
        $booking = Booking::factory()->create([
            'user_id' => $this->customer->id,
            'service_id' => $service->id,
        ]);

        $token = $this->admin->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/admin/bookings');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'bookings' => [
                    '*' => [
                        'id',
                        'user_id',
                        'service_id',
                        'booking_date',
                        'status',
                        'user' => [
                            'id',
                            'name',
                            'email',
                            'role',
                        ],
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

    public function test_admin_can_view_all_services(): void
    {
        Service::factory()->create([
            'name' => 'Plumbing',
            'status' => true,
        ]);

        Service::factory()->create([
            'name' => 'Electrical',
            'status' => false,
        ]);

        $token = $this->admin->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/admin/services');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'services' => [
                    '*' => [
                        'id',
                        'name',
                        'description',
                        'price',
                        'status',
                    ],
                ],
            ]);

        $response->assertJsonCount(2, 'services');
    }

    public function test_customer_cannot_access_admin_endpoints(): void
    {
        $token = $this->customer->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/admin/bookings');

        $response->assertStatus(403);
    }

    public function test_unauthenticated_user_cannot_access_admin_endpoints(): void
    {
        $response = $this->getJson('/api/admin/bookings');

        $response->assertStatus(401);
    }
}
