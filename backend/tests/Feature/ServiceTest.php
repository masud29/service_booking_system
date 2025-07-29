<?php

namespace Tests\Feature;

use App\Models\Service;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ServiceTest extends TestCase
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

    public function test_customer_can_view_services(): void
    {
        Service::factory()->create([
            'name' => 'Plumbing',
            'description' => 'Professional plumbing services',
            'price' => 50.00,
            'status' => true,
        ]);

        $token = $this->customer->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/services');

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
    }

    public function test_admin_can_create_service(): void
    {
        $serviceData = [
            'name' => 'Carpentry',
            'description' => 'Professional carpentry services',
            'price' => 60.00,
            'status' => true,
        ];

        $token = $this->admin->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/services', $serviceData);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'message',
                'service' => [
                    'id',
                    'name',
                    'description',
                    'price',
                    'status',
                ],
            ]);

        $this->assertDatabaseHas('services', $serviceData);
    }

    public function test_admin_can_update_service(): void
    {
        $service = Service::factory()->create([
            'name' => 'Plumbing',
            'price' => 50.00,
        ]);

        $updateData = [
            'name' => 'Updated Plumbing',
            'description' => 'Updated plumbing services',
            'price' => 55.00,
        ];

        $token = $this->admin->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->putJson("/api/services/{$service->id}", $updateData);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'message',
                'service' => [
                    'id',
                    'name',
                    'description',
                    'price',
                    'status',
                ],
            ]);

        $this->assertDatabaseHas('services', [
            'id' => $service->id,
            'name' => 'Updated Plumbing',
            'price' => 55.00,
        ]);
    }

    public function test_admin_can_delete_service(): void
    {
        $service = Service::factory()->create();

        $token = $this->admin->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->deleteJson("/api/services/{$service->id}");

        $response->assertStatus(200)
            ->assertJson(['message' => 'Service deleted successfully']);

        $this->assertDatabaseMissing('services', ['id' => $service->id]);
    }

    public function test_customer_cannot_create_service(): void
    {
        $serviceData = [
            'name' => 'Carpentry',
            'description' => 'Professional carpentry services',
            'price' => 60.00,
        ];

        $token = $this->customer->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/services', $serviceData);

        $response->assertStatus(403);
    }

    public function test_service_validation(): void
    {
        $token = $this->admin->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/services', [
            'name' => '',
            'description' => '',
            'price' => -10,
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name', 'description', 'price']);
    }
}
