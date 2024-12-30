<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Follow extends Model
{
    use HasFactory;

    public function following()
    {
        return $this->belongsTo(User::class);
    }

    public function followee()
    {
        return $this->hasOne(User::class);
    }
}
