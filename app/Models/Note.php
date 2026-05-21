<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $fillable = ['evaluation_id', 'critere', 'valeur'];

    public function evaluation()
    {
        return $this->belongsTo(Evaluation::class);
    }
}