<?php
namespace App\Http\Controllers;

use App\Models\Idea;
use App\Models\Vote;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class IdeaController extends Controller
{
    public function index(): JsonResponse
    {
        // alias the count column to `votes_count` is default; we prefer `votesCount` in JSON
        $ideas = Idea::withCount(['votes as votesCount'])->with('comments.user', 'creator')->get()->sortByDesc('votesCount')->values();
        return response()->json($ideas);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'createdBy' => 'required|integer|exists:users,id'
        ]);
        // project uses camelCase DB column `createdBy`; ensure attribute is present
        if (isset($data['created_by']) && !isset($data['createdBy'])) {
            $data['createdBy'] = $data['created_by'];
            unset($data['created_by']);
        }

        $idea = Idea::create($data);
        return response()->json($idea, 201);
    }

    public function show($id): JsonResponse
    {
        try {
            $idea = Idea::with('comments.user','votes')->findOrFail($id);
            // normalize to the same property name used by the index
            $idea->votesCount = $idea->votes->count();
            return response()->json($idea);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error'=>'Ideia não encontrada'], 404);
        }
    }

    public function vote($id, Request $request): JsonResponse
    {
        $data = $request->validate(['userId'=>'required|integer|exists:users,id']);
        try {
            $vote = Vote::create(['idea_id'=>$id,'user_id'=>$data['userId']]);
            return response()->json($vote, 201);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['error'=>'Usuário já votou nesta ideia ou requisição inválida!'], 400);
        }
    }

    public function comment($id, Request $request): JsonResponse
    {
        $data = $request->validate(['userId'=>'required|integer|exists:users,id','message'=>'required|string']);
        $comment = Comment::create(['idea_id'=>$id,'user_id'=>$data['userId'],'message'=>$data['message']]);
        return response()->json($comment, 201);
    }
}
