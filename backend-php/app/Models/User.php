<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    use HasFactory;
    protected $fillable = ['name','email'];

    public function ideas(): HasMany { return $this->hasMany(Idea::class, 'createdBy'); }
    public function comments(): HasMany { return $this->hasMany(Comment::class); }
    public function votes(): HasMany { return $this->hasMany(Vote::class); }
}
