<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('editions', function (Blueprint $table) {
            $table->string('color_primary', 20)->default('#7C1D28')->after('pdf_path');
            $table->string('color_secondary', 20)->nullable()->after('color_primary');
            $table->text('quote_text')->nullable()->after('color_secondary');
            $table->string('quote_author')->nullable()->after('quote_text');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('editions', function (Blueprint $table) {
            $table->dropColumn(['color_primary', 'color_secondary', 'quote_text', 'quote_author']);
        });
    }
};
