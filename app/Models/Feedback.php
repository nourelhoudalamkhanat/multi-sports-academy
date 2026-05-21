<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    protected $fillable = ['evaluation_id', 'message', 'generated_by_ai'];

    public function evaluation()
    {
        return $this->belongsTo(Evaluation::class);
    }
}