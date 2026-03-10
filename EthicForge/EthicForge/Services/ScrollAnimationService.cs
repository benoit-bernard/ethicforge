using Microsoft.JSInterop;

namespace EthicForge.Services;

public sealed class ScrollAnimationService(IJSRuntime jsRuntime)
{
    public async Task ScrollToTopAsync()
    {
        try
        {
            await jsRuntime.InvokeVoidAsync("EthicForge.scrollToTop");
        }
        catch (JSDisconnectedException)
        {
            // Silently ignore — component disposed during navigation
        }
    }
}
