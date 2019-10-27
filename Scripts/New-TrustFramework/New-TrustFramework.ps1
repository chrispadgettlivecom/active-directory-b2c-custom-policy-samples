[CmdletBinding()]
param (
  [Parameter(Mandatory = $true)]
  [string]
  $TenantId,

  [Parameter(Mandatory = $true)]
  [string]
  $ClientId,

  [Parameter(Mandatory = $true)]
  [string]
  $ClientSecret,

  [Parameter(Mandatory = $true)]
  [string]
  $PolicyId,

  [Parameter(Mandatory = $true)]
  [string]
  $PolicyFilePath
)

process {
  try {
    $getAccessTokenRequestBody = @{
      grant_type = "client_credentials";
      client_id = $ClientId;
      client_secret = $ClientSecret;
      scope = "https://graph.microsoft.com/.default"
    }

    $getAccessTokenRequestUri = "https://login.microsoftonline.com/$TenantId/oauth2/v2.0/token"
    $getAccessTokenResponseBody = Invoke-RestMethod -Method Post -Uri $getAccessTokenRequestUri -Body $getAccessTokenRequestBody
    $accessToken = $getAccessTokenResponseBody.access_token

    $createOrUpdateTrustFrameworkPolicyRequestUri = "https://graph.microsoft.com/beta/trustFramework/policies/$PolicyId/" + '$value'
    $createOrUpdateTrustFrameworkPolicyRequestHeaders = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"
    $createOrUpdateTrustFrameworkPolicyRequestHeaders.Add("Authorization", "Bearer $accessToken")
    $createOrUpdateTrustFrameworkPolicyRequestHeaders.Add("Content-Type", "application/xml")
    $createOrUpdateTrustFrameworkPolicyRequestBody = Get-Content $PolicyFilePath
    $createOrUpdateTrustFrameworkPolicyResponseBody = Invoke-RestMethod -Method Put -Uri $createOrUpdateTrustFrameworkPolicyRequestUri -Headers $createOrUpdateTrustFrameworkPolicyRequestHeaders -Body $createOrUpdateTrustFrameworkPolicyRequestBody

    Write-Host "Uploaded policy $PolicyId."
  }
  catch {
    Write-Host "Failed to upload policy $PolicyId."

    Write-Host "Status code:" $_.Exception.Response.StatusCode.value__

    $errorResponseBodyStreamReader = [System.IO.StreamReader]::new($_.Exception.Response.GetResponseStream())
    $errorResponseBody = $errorResponseBodyStreamReader.ReadToEnd()
    $errorResponseBodyStreamReader.Close()

    $errorResponseBody

    exit 1
  }
}

end {
  exit 0
}
