<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Idea extends Model
{
    use HasFactory;
    protected $fillable = ['title','description','createdBy'];

    public function creator(): BelongsTo { return $this->belongsTo(User::class, 'createdBy'); }
    public function comments(): HasMany { return $this->hasMany(Comment::class); }
    public function votes(): HasMany { return $this->hasMany(Vote::class); }
}
