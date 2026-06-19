$chain = Get-Content chronological_chain.json | ConvertFrom-Json

git reset --hard 9a6a948bbb791b6a4ad0d61a9b63f439497a328b

$tempDir = "C:\temp\github_restore"
if (-not (Test-Path $tempDir)) { New-Item -ItemType Directory -Force -Path $tempDir }

foreach ($h in $chain) {
    Write-Host "Processing $h..."
    
    # Download patch and zip to tempDir
    if (-not (Test-Path "$tempDir\$h.patch")) {
        Invoke-WebRequest -Uri "https://github.com/teoteo05-beep/Finalterm/commit/$h.patch" -OutFile "$tempDir\$h.patch"
    }
    if (-not (Test-Path "$tempDir\$h.zip")) {
        Invoke-WebRequest -Uri "https://github.com/teoteo05-beep/Finalterm/archive/$h.zip" -OutFile "$tempDir\$h.zip"
    }
    
    # Extract to tempDir
    if (-not (Test-Path "$tempDir\zip_$h")) {
        Expand-Archive -Path "$tempDir\$h.zip" -DestinationPath "$tempDir\zip_$h" -Force
    }
    $extractedFolder = "$tempDir\zip_$h\Finalterm-$h"
    
    # Parse Patch
    $patchFile = "$tempDir\$h.patch"
    $author = ""
    $date = ""
    $subject = ""
    $lines = Get-Content $patchFile
    foreach ($line in $lines) {
        if ($line -match "^From: (.*)") { $author = $matches[1] }
        if ($line -match "^Date: (.*)") { $date = $matches[1] }
        if ($line -match "^Subject: \[PATCH\] (.*)") { $subject = $matches[1]; break }
    }
    
    # Clean current directory EXCEPT .git
    Get-ChildItem | Where-Object { $_.Name -ne '.git' -and $_.Name -ne 'restore_clean.ps1' -and $_.Name -ne 'chronological_chain.json' } | Remove-Item -Recurse -Force
    
    # Copy new files from tempDir
    Copy-Item -Path "$extractedFolder\*" -Destination ".\" -Recurse -Force
    
    # Set Env
    $env:GIT_AUTHOR_DATE = $date
    $env:GIT_COMMITTER_DATE = $date
    $authorName = $author -replace ' <.*>',''
    $authorEmail = ($author -replace '.*<','') -replace '>',''
    $env:GIT_AUTHOR_NAME = $authorName
    $env:GIT_AUTHOR_EMAIL = $authorEmail
    $env:GIT_COMMITTER_NAME = $authorName
    $env:GIT_COMMITTER_EMAIL = $authorEmail
    
    git add -A
    git commit -m "$subject"
    Write-Host "Committed $subject"
}
