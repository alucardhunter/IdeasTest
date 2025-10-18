<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Idea;

class IdeasEndpointsTest extends TestCase
{
    use RefreshDatabase;

    public function test_list_create_show_vote_comment_and_users()
    {
        // run migrations
        $this->artisan('migrate');

        // create a user
        $user = User::create(['name' => 'Test User', 'email' => 'test@example.com']);

        // initially list is empty
        $res = $this->get('/api/ideas');
        $res->assertStatus(200);
        $this->assertEmpty($res->json());

        // create idea
        $create = $this->postJson('/api/ideas', [
            'title' => 'New Idea',
            'description' => 'An idea',
            'createdBy' => $user->id
        ]);
        $create->assertStatus(201);
        $ideaId = $create->json('id');

        // list now contains the idea
        $res2 = $this->get('/api/ideas');
        $res2->assertStatus(200);
        $this->assertCount(1, $res2->json());

        // show the idea
        $show = $this->get("/api/ideas/{$ideaId}");
        $show->assertStatus(200);

        // vote the idea
        $vote = $this->postJson("/api/ideas/{$ideaId}/vote", ['userId' => $user->id]);
        $vote->assertStatus(201);

        // comment on idea
        $comment = $this->postJson("/api/ideas/{$ideaId}/comments", ['userId' => $user->id, 'message' => 'Nice']);
        $comment->assertStatus(201);

        // users endpoint
        $users = $this->get('/api/users');
        $users->assertStatus(200);
        $this->assertNotEmpty($users->json());
    }
}
