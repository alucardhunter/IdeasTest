<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class IdeasTest extends TestCase
{
    use RefreshDatabase;

    public function test_list_ideas_returns_ok()
    {
        $this->artisan('migrate');
        $response = $this->get('/ideas');
        $response->assertStatus(200);
    }
}
